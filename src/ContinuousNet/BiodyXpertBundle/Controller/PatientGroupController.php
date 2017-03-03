<?php

namespace ContinuousNet\BiodyXpertBundle\Controller;

use ContinuousNet\BiodyXpertBundle\Entity\PatientGroup;
use ContinuousNet\BiodyXpertBundle\Form\PatientGroupType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Patient Group Controller
 * 
 * Manage PatientGroups 
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
 * @see		PatientGroupController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/patientgroup")
 */
class PatientGroupController extends BaseController
{
	/**
	 * Lists all PatientGroup entities.
	 *
	 * @Route("/", name="patientgroup_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$patientGroups = $em->getRepository('BiodyXpertBundle:PatientGroup')->findAll();

		return $this->render('BiodyXpertBundle:PatientGroup:index.html.twig', array(
			'patientGroups' => $patientGroups,
		));
	}

	/**
	 * Creates a new PatientGroup entity.
	 *
	 * @Route("/new", name="patientgroup_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$patientGroup = new PatientGroup();
		$form = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\PatientGroupType', $patientGroup);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($patientGroup);
			$em->flush();

			return $this->redirectToRoute('patientgroup_show', array('id' => $patientGroup->getId()));
		}

		return $this->render('BiodyXpertBundle:PatientGroup:new.html.twig', array(
			'patientGroup' => $patientGroup,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a PatientGroup entity.
	 *
	 * @Route("/{id}", name="patientgroup_show")
	 * @Method("GET")
	 */
	public function showAction(PatientGroup $patientGroup)
	{
		$deleteForm = $this->createDeleteForm($patientGroup);

		return $this->render('BiodyXpertBundle:PatientGroup:show.html.twig', array(
			'patientGroup' => $patientGroup,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing PatientGroup entity.
	 *
	 * @Route("/{id}/edit", name="patientgroup_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, PatientGroup $patientGroup)
	{
		$deleteForm = $this->createDeleteForm($patientGroup);
		$editForm = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\PatientGroupType', $patientGroup);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($patientGroup);
			$em->flush();

			return $this->redirectToRoute('patientgroup_edit', array('id' => $patientGroup->getId()));
		}

		return $this->render('BiodyXpertBundle:PatientGroup:edit.html.twig', array(
			'patientGroup' => $patientGroup,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a PatientGroup entity.
	 *
	 * @Route("/{id}", name="patientgroup_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, PatientGroup $patientGroup)
	{
		$form = $this->createDeleteForm($patientGroup);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($patientGroup);
			$em->flush();
		}

		return $this->redirectToRoute('patientgroup_index');
	}

	/**
	 * Creates a form to delete a PatientGroup entity.
	 *
	 * @param PatientGroup $patientGroup The PatientGroup entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(PatientGroup $patientGroup)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('patientgroup_delete', array('id' => $patientGroup->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
