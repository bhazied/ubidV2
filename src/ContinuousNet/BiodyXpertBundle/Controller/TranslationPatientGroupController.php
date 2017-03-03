<?php

namespace ContinuousNet\BiodyXpertBundle\Controller;

use ContinuousNet\BiodyXpertBundle\Entity\TranslationPatientGroup;
use ContinuousNet\BiodyXpertBundle\Form\TranslationPatientGroupType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Translation Patient Group Controller
 * 
 * Manage TranslationPatientGroups 
 * 
 * PHP version 5.4.4
 * 
 * @category   Symfony 2 Controller
 * @package	ContinuousNet\BiodyXpertBundle\Controller
 * @author	 Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2017 CONTINUOUS NET
 * @license	CONTINUOUS NET REGULAR LICENSE
 * @version	Release: 1.0
 * @link	   http://biodyxpert.continuousnet.com/ContinuousNet/BiodyXpertBundle/Controller
 * @see		TranslationPatientGroupController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/translationpatientgroup")
 */
class TranslationPatientGroupController extends BaseController
{
	/**
	 * Lists all TranslationPatientGroup entities.
	 *
	 * @Route("/", name="translationpatientgroup_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$translationPatientGroups = $em->getRepository('BiodyXpertBundle:TranslationPatientGroup')->findAll();

		return $this->render('BiodyXpertBundle:TranslationPatientGroup:index.html.twig', array(
			'translationPatientGroups' => $translationPatientGroups,
		));
	}

	/**
	 * Creates a new TranslationPatientGroup entity.
	 *
	 * @Route("/new", name="translationpatientgroup_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$translationPatientGroup = new TranslationPatientGroup();
		$form = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\TranslationPatientGroupType', $translationPatientGroup);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($translationPatientGroup);
			$em->flush();

			return $this->redirectToRoute('translationpatientgroup_show', array('id' => $translationPatientGroup->getId()));
		}

		return $this->render('BiodyXpertBundle:TranslationPatientGroup:new.html.twig', array(
			'translationPatientGroup' => $translationPatientGroup,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a TranslationPatientGroup entity.
	 *
	 * @Route("/{id}", name="translationpatientgroup_show")
	 * @Method("GET")
	 */
	public function showAction(TranslationPatientGroup $translationPatientGroup)
	{
		$deleteForm = $this->createDeleteForm($translationPatientGroup);

		return $this->render('BiodyXpertBundle:TranslationPatientGroup:show.html.twig', array(
			'translationPatientGroup' => $translationPatientGroup,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing TranslationPatientGroup entity.
	 *
	 * @Route("/{id}/edit", name="translationpatientgroup_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, TranslationPatientGroup $translationPatientGroup)
	{
		$deleteForm = $this->createDeleteForm($translationPatientGroup);
		$editForm = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\TranslationPatientGroupType', $translationPatientGroup);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($translationPatientGroup);
			$em->flush();

			return $this->redirectToRoute('translationpatientgroup_edit', array('id' => $translationPatientGroup->getId()));
		}

		return $this->render('BiodyXpertBundle:TranslationPatientGroup:edit.html.twig', array(
			'translationPatientGroup' => $translationPatientGroup,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a TranslationPatientGroup entity.
	 *
	 * @Route("/{id}", name="translationpatientgroup_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, TranslationPatientGroup $translationPatientGroup)
	{
		$form = $this->createDeleteForm($translationPatientGroup);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($translationPatientGroup);
			$em->flush();
		}

		return $this->redirectToRoute('translationpatientgroup_index');
	}

	/**
	 * Creates a form to delete a TranslationPatientGroup entity.
	 *
	 * @param TranslationPatientGroup $translationPatientGroup The TranslationPatientGroup entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(TranslationPatientGroup $translationPatientGroup)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('translationpatientgroup_delete', array('id' => $translationPatientGroup->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
