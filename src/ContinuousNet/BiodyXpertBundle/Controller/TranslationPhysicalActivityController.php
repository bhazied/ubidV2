<?php

namespace ContinuousNet\BiodyXpertBundle\Controller;

use ContinuousNet\BiodyXpertBundle\Entity\TranslationPhysicalActivity;
use ContinuousNet\BiodyXpertBundle\Form\TranslationPhysicalActivityType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Translation Physical Activity Controller
 * 
 * Manage TranslationPhysicalActivities 
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
 * @see		TranslationPhysicalActivityController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/translationphysicalactivity")
 */
class TranslationPhysicalActivityController extends BaseController
{
	/**
	 * Lists all TranslationPhysicalActivity entities.
	 *
	 * @Route("/", name="translationphysicalactivity_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$translationPhysicalActivities = $em->getRepository('BiodyXpertBundle:TranslationPhysicalActivity')->findAll();

		return $this->render('BiodyXpertBundle:TranslationPhysicalActivity:index.html.twig', array(
			'translationPhysicalActivities' => $translationPhysicalActivities,
		));
	}

	/**
	 * Creates a new TranslationPhysicalActivity entity.
	 *
	 * @Route("/new", name="translationphysicalactivity_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$translationPhysicalActivity = new TranslationPhysicalActivity();
		$form = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\TranslationPhysicalActivityType', $translationPhysicalActivity);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($translationPhysicalActivity);
			$em->flush();

			return $this->redirectToRoute('translationphysicalactivity_show', array('id' => $translationPhysicalActivity->getId()));
		}

		return $this->render('BiodyXpertBundle:TranslationPhysicalActivity:new.html.twig', array(
			'translationPhysicalActivity' => $translationPhysicalActivity,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a TranslationPhysicalActivity entity.
	 *
	 * @Route("/{id}", name="translationphysicalactivity_show")
	 * @Method("GET")
	 */
	public function showAction(TranslationPhysicalActivity $translationPhysicalActivity)
	{
		$deleteForm = $this->createDeleteForm($translationPhysicalActivity);

		return $this->render('BiodyXpertBundle:TranslationPhysicalActivity:show.html.twig', array(
			'translationPhysicalActivity' => $translationPhysicalActivity,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing TranslationPhysicalActivity entity.
	 *
	 * @Route("/{id}/edit", name="translationphysicalactivity_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, TranslationPhysicalActivity $translationPhysicalActivity)
	{
		$deleteForm = $this->createDeleteForm($translationPhysicalActivity);
		$editForm = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\TranslationPhysicalActivityType', $translationPhysicalActivity);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($translationPhysicalActivity);
			$em->flush();

			return $this->redirectToRoute('translationphysicalactivity_edit', array('id' => $translationPhysicalActivity->getId()));
		}

		return $this->render('BiodyXpertBundle:TranslationPhysicalActivity:edit.html.twig', array(
			'translationPhysicalActivity' => $translationPhysicalActivity,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a TranslationPhysicalActivity entity.
	 *
	 * @Route("/{id}", name="translationphysicalactivity_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, TranslationPhysicalActivity $translationPhysicalActivity)
	{
		$form = $this->createDeleteForm($translationPhysicalActivity);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($translationPhysicalActivity);
			$em->flush();
		}

		return $this->redirectToRoute('translationphysicalactivity_index');
	}

	/**
	 * Creates a form to delete a TranslationPhysicalActivity entity.
	 *
	 * @param TranslationPhysicalActivity $translationPhysicalActivity The TranslationPhysicalActivity entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(TranslationPhysicalActivity $translationPhysicalActivity)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('translationphysicalactivity_delete', array('id' => $translationPhysicalActivity->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
