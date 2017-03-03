<?php

namespace ContinuousNet\BiodyXpertBundle\Controller;

use ContinuousNet\BiodyXpertBundle\Entity\LicenceType;
use ContinuousNet\BiodyXpertBundle\Form\LicenceTypeType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Licence Type Controller
 * 
 * Manage LicenceTypes 
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
 * @see		LicenceTypeController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/licencetype")
 */
class LicenceTypeController extends BaseController
{
	/**
	 * Lists all LicenceType entities.
	 *
	 * @Route("/", name="licencetype_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$licenceTypes = $em->getRepository('BiodyXpertBundle:LicenceType')->findAll();

		return $this->render('BiodyXpertBundle:LicenceType:index.html.twig', array(
			'licenceTypes' => $licenceTypes,
		));
	}

	/**
	 * Creates a new LicenceType entity.
	 *
	 * @Route("/new", name="licencetype_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$licenceType = new LicenceType();
		$form = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\LicenceTypeType', $licenceType);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($licenceType);
			$em->flush();

			return $this->redirectToRoute('licencetype_show', array('id' => $licenceType->getId()));
		}

		return $this->render('BiodyXpertBundle:LicenceType:new.html.twig', array(
			'licenceType' => $licenceType,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a LicenceType entity.
	 *
	 * @Route("/{id}", name="licencetype_show")
	 * @Method("GET")
	 */
	public function showAction(LicenceType $licenceType)
	{
		$deleteForm = $this->createDeleteForm($licenceType);

		return $this->render('BiodyXpertBundle:LicenceType:show.html.twig', array(
			'licenceType' => $licenceType,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing LicenceType entity.
	 *
	 * @Route("/{id}/edit", name="licencetype_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, LicenceType $licenceType)
	{
		$deleteForm = $this->createDeleteForm($licenceType);
		$editForm = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\LicenceTypeType', $licenceType);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($licenceType);
			$em->flush();

			return $this->redirectToRoute('licencetype_edit', array('id' => $licenceType->getId()));
		}

		return $this->render('BiodyXpertBundle:LicenceType:edit.html.twig', array(
			'licenceType' => $licenceType,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a LicenceType entity.
	 *
	 * @Route("/{id}", name="licencetype_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, LicenceType $licenceType)
	{
		$form = $this->createDeleteForm($licenceType);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($licenceType);
			$em->flush();
		}

		return $this->redirectToRoute('licencetype_index');
	}

	/**
	 * Creates a form to delete a LicenceType entity.
	 *
	 * @param LicenceType $licenceType The LicenceType entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(LicenceType $licenceType)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('licencetype_delete', array('id' => $licenceType->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
